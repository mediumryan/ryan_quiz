import { supabase } from '@/utils/supabase/server';

export type Quiz = {
  id: string; // 퀴즈 ID
  image_path: string; // 퀴즈에 관련된 이미지
  answers: string[]; // 퀴즈 정답 목록
};

export async function checkUserAnswer(
  quizId: string,
  userAnswer: string
): Promise<boolean> {
  // 1. 특정 quiz_id의 정답 목록 가져오기
  const { data: answers, error } = await supabase
    .from('quizzes_answers')
    .select('answer')
    .eq('quiz_id', quizId);

  if (error) {
    console.error('Error fetching answers:', error);
    throw new Error('정답 데이터를 불러오지 못했습니다.');
  }

  // 2. 정답 목록에서 사용자의 입력값과 일치하는 값이 있는지 확인
  const correctAnswers =
    answers?.map((item) => item.answer.toLowerCase().trim()) || [];
  return correctAnswers.includes(userAnswer.toLowerCase().trim());
}

export const getQuizData = async (genre_id: number): Promise<Quiz[]> => {
  const { data: genreData, error: genreError } = await supabase
    .from('quizzes_genres')
    .select('quiz_id')
    .eq('genre_id', genre_id);

  if (genreError) {
    console.error('Error fetching genre data:', genreError);
    throw new Error('장르 데이터를 불러오지 못했습니다.');
  }

  const quizIds = genreData?.map((item) => item.quiz_id);

  // quizzes 테이블에서 quiz 데이터 가져오기
  const { data: quizData, error: quizError } = await supabase
    .from('quizzes')
    .select('id, image_path')
    .in('id', quizIds);

  if (quizError) {
    console.error('Error fetching quizzes:', quizError);
    throw new Error('퀴즈 데이터를 불러오지 못했습니다.');
  }

  // quizzes_answers 테이블에서 quiz_id별 정답 데이터 가져오기
  const { data: answerData, error: answerError } = await supabase
    .from('quizzes_answers')
    .select('quiz_id, answer')
    .in('quiz_id', quizIds);

  if (answerError) {
    console.error('Error fetching answers:', answerError);
    throw new Error('정답 데이터를 불러오지 못했습니다.');
  }

  // quiz_id 기준으로 정답 데이터를 매핑
  const answersMap = answerData.reduce((acc, cur) => {
    if (!acc[cur.quiz_id]) acc[cur.quiz_id] = [];
    acc[cur.quiz_id].push(cur.answer);
    return acc;
  }, {} as Record<string, string[]>);

  // 최종적으로 Quiz 배열을 생성
  const quizzes: Quiz[] = quizData.map((quiz) => ({
    id: quiz.id,
    image_path: quiz.image_path,
    answers: answersMap[quiz.id] || [], // 해당 quiz_id의 answers 매핑
  }));

  console.log(quizzes);
  return quizzes;
};
