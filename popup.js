document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("translateBtn").addEventListener("click", async () => {
    const text = document.getElementById("text").value.trim();
    const source_lang = document.getElementById("source_lang").value;
    const target_lang = document.getElementById("target_lang").value;
    const resultDiv = document.getElementById("result");

    if (!text || source_lang === target_lang) {
      resultDiv.textContent = "Invalid input or same language selected.";
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/translate-snippet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text,
          source_language: source_lang,
          target_language: target_lang
        })
      });

      const data = await response.json();
      resultDiv.textContent = data.translated_text || data.error || "Something went wrong.";
    } catch (error) {
      resultDiv.textContent = "Error contacting translation service.";
    }
  });
});
