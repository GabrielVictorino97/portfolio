import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

// Config própria: o vite.config.ts do app passa pelo preset da Lovable
// (TanStack Start, Nitro, prerender), que não faz sentido carregar nos testes.
export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
