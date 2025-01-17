/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => {
    return [
      {
        source: "/chrome",
        destination:
          "https://chrome.google.com/webstore/detail/gophergrades-past-grades/lhekbajaehiokcacoaeicphgdnmeaedp",
        permanent: true,
      },
      {
        source: "/social-coding",
        destination: "https://discord.gg/ctcXWjUJqZ",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
