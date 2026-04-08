async function analyze() {
    const age = document.getElementById("age").value;
    const income = document.getElementById("income").value;
    const riskLevel = document.getElementById("risk").value;

    const response = await fetch("/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ age, income, riskLevel })
    });

    const data = await response.json();

    document.getElementById("result").innerHTML = `
        <h3>Risk Score: ${data.score}</h3>
        <p>${data.message}</p>
        <p><b>Recommended:</b> ${data.recommendation.portfolio.join(", ")}</p>
    `;
}