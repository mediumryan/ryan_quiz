// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname:
          '/mediumryan/ryan_quiz_image_dir/refs/heads/master/src/images/actor/**',
      },
      {
        protocol: 'https',
        hostname: 'i.namu.wiki',
        pathname: '/i/**',
      },
    ],
  },
};
