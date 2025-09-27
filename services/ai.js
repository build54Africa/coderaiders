export async function callAI(message) {
  try {
    const response = await fetch("http://172.20.10.2:5000/api/chat", { // <-- your host IP
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error("AI request failed");
    }

    const data = await response.json();
    return data.text;
  } catch (err) {
    console.error("callAI error:", err);
    throw err;
  }
}
