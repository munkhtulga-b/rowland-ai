export const preprocessLaTeX = (content: string): string => {
  // Escape $ symbols that are not intended for LaTeX
  const escapedContent = content.replace(/\$/g, "\\$");

  // Replace block-level LaTeX delimiters \[ \] with $$ $$, non-greedy match
  const blockProcessedContent = escapedContent.replace(
    /\\\[(.*?)\\\]/g,
    (_, equation) => `$$${equation}$$`
  );

  // Replace inline LaTeX delimiters \( \) with $ $, non-greedy match
  const inlineProcessedContent = blockProcessedContent.replace(
    /\\\((.*?)\\\)/g,
    (_, equation) => `$${equation}$`
  );

  return inlineProcessedContent;
};

export const generateUUID = () => {
  let d = new Date().getTime();
  let d2 = (performance && performance.now && performance.now() * 1000) || 0; // Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = Math.random() * 16; // random number between 0 and 16
    if (d > 0) {
      // Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      // Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export const createQueryString = <T>(queryObject: T | undefined) => {
  if (!queryObject) {
    return "";
  }

  let queryString = "?";
  const keys = Object.keys(queryObject);

  keys.forEach((key, idx) => {
    if (idx === keys.length - 1) {
      queryString += `${key}=${queryObject[key as keyof T]}`;
    } else {
      queryString += `${key}=${queryObject[key as keyof T]}&`;
    }
  });

  return queryString;
};

export const passwordValidator = (value: string) => {
  if (value === undefined || value === null || value.length === 0) {
    return {
      isValid: false,
      message: 'Password is required'
    }
  }
  if (value.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters'
    }
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return {
      isValid: false,
      message: 'Password must contain at least 1 letter and 1 number'
    }
  }
  return {
    isValid: true,
  };
};