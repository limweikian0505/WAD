export type ValidationResult = {
  isValid: boolean;
  message: string;
};

export const sanitizeNoteInput = (title: string, content: string) => {
  return {
    title: title.trim(),
    content: content.trim(),
  };
};

export const validateNoteInput = (
  title: string,
  content: string,
): ValidationResult => {
  const sanitized = sanitizeNoteInput(title, content);

  if (!sanitized.title) {
    return {
      isValid: false,
      message: 'Title cannot be empty',
    };
  }

  if (!sanitized.content) {
    return {
      isValid: false,
      message: 'Content cannot be empty',
    };
  }

  return {
    isValid: true,
    message: '',
  };
};
