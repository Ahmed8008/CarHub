/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['cdn.imagin.studio']
    },
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
    
};



export default nextConfig;
