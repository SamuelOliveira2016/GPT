# OcupaDocente — SENAI Araçatuba: motor OR-Tools (piloto)

**Leia primeiro:** [INSTRUCOES_GOOGLE_AI_STUDIO.md](INSTRUCOES_GOOGLE_AI_STUDIO.md) e [IMPLEMENTACAO_MOTOR.md](IMPLEMENTACAO_MOTOR.md).

Esta versão mantém a interface React do AI Studio e adiciona um backend Python real para programar UCs por data, docente e ambiente. **Não considera a grade artificial existente como oficial.** O novo motor é acessado pela aba **Motor OR-Tools**.

***Aviso de validação:*** o OR-Tools não estava instalado no ambiente de criação; execute o teste ponta a ponta antes de usar o cálculo. Os testes de regras e dados foram realizados com sucesso.

---

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/bec19174-884b-4130-807c-b3ab2f576a90

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
