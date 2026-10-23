import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
sassOptions: {
  quietDeps: true,
  silenceDeprecations: ["import", "if-function", "global-builtin", "color-functions", "mixed-decls", "slash-div"],
  loadPaths: [
    path.join(process.cwd(), "node_modules"),
    path.join(process.cwd(), "node_modules/bootstrap/scss"),
  ],
},
};

export default nextConfig;
