export const prompt = async (question: string, sessionId: string) => {
  const formData = new FormData();
  formData.append("uri", "bolt://35.239.38.16:7687");
  formData.append("password", "abcd1234");
  formData.append("userName", "neo4j");
  formData.append("database", "neo4j");
  formData.append("model", "OpenAI GPT 4o");
  formData.append("question", question);
  formData.append("session_id", sessionId);

  return await fetch("http://35.239.38.16:8080/chat_bot", {
    method: "POST",
    body: formData,
  });
};

export const connect = async () => {
  const formData = new FormData();
  formData.append("uri", "bolt://35.239.38.16:7687");
  formData.append("password", "abcd1234");
  formData.append("userName", "neo4j");
  formData.append("database", "neo4j");

  return await fetch("http://35.239.38.16:8080/connect", {
    method: "POST",
    body: formData,
  });
};
