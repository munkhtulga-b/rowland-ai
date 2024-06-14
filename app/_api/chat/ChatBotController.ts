export const prompt = async (question: string, sessionId: string) => {
  const body = {
    session_id: sessionId,
    question: question,
  };

  return await fetch("http://192.168.1.12:4000/v1/chat", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
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
