import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type NoteInputProps = {
  screenTitle: string;
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSubmit: () => void;
  submitLabel: string;
  disabled?: boolean;
  helperMessage?: string;
};

const NoteInput = ({
  screenTitle,
  title,
  content,
  onTitleChange,
  onContentChange,
  onSubmit,
  submitLabel,
  disabled = false,
  helperMessage,
}: NoteInputProps) => {
  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>{screenTitle}</Text>
          <Text style={styles.headerText}>
            Titles and content are trimmed before saving. Empty values are blocked.
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            placeholder="Enter note title"
            placeholderTextColor="#9aa7c2"
            style={styles.input}
            value={title}
            onChangeText={onTitleChange}
            maxLength={120}
          />

          <Text style={styles.label}>Content</Text>
          <TextInput
            placeholder="Write your note content"
            placeholderTextColor="#9aa7c2"
            style={[styles.input, styles.multilineInput]}
            value={content}
            onChangeText={onContentChange}
            multiline
            textAlignVertical="top"
          />

          <Text style={styles.helperText}>{helperMessage ?? ' '}</Text>

          <Pressable
            style={[styles.submitButton, disabled && styles.submitButtonDisabled]}
            disabled={disabled}
            onPress={onSubmit}>
            <Text style={styles.submitButtonText}>{submitLabel}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 16,
    gap: 16,
    backgroundColor: '#f4f6fb',
  },
  headerCard: {
    backgroundColor: '#314c7b',
    borderRadius: 20,
    padding: 20,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
  },
  headerText: {
    color: '#d8e2ff',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
  },
  label: {
    color: '#1b2741',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    borderColor: '#d5ddef',
    borderRadius: 14,
    borderWidth: 1,
    color: '#1b2741',
    fontSize: 15,
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  multilineInput: {
    minHeight: 180,
  },
  helperText: {
    color: '#b04a4a',
    fontSize: 13,
    minHeight: 18,
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: '#ff8a5b',
    borderRadius: 14,
    marginTop: 12,
    paddingVertical: 15,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default NoteInput;
