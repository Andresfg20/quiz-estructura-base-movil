# Montaje rápido (Quiz Programación Móvil · CORHUILA)

```bash
npm install -g @ionic/cli
ionic start quiz-movil blank --type=react --capacitor
cd quiz-movil
npm install @capacitor-community/sqlite
npx cap add android
```

1. Borra el contenido de `src/` de la plantilla, EXCEPTO `src/theme/` (y `vite-env.d.ts` si existe).
2. Copia dentro de `src/` las carpetas y archivos de este paquete (`application`, `domain`, `infrastructure`, `presentation`, `App.tsx`, `main.tsx`).
3. Verifica `"strict": true` en `tsconfig.json`.
4. En `capacitor.config.ts` agrega:
   `plugins: { CapacitorSQLite: { androidIsEncryption: false } }`
5. Compila y ejecuta:
```bash
npm run build
npx cap sync android
npx cap run android      # o: npx cap open android → Run
```
Nota: SQLite es nativo, se prueba en Android (no con `ionic serve`).
