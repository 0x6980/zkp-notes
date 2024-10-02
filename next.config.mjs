import nextra from 'nextra'
 
const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  latex: {
    renderer: 'katex'
  }
})
 
export default withNextra(
  {
    basePath: '/zkp',
    output: "export",  // <=== enables static exports
    reactStrictMode: true,
    images: { unoptimized: true}
  }
)
 
// If you have other Next.js configurations, you can pass them as the parameter:
// export default withNextra({ /* other next.js config */ })