import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    backgroundColor: '#FFD84D',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 24,
    borderWidth: 5,
    borderColor: '#ff6200',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  row: {
    flexDirection: 'row',
    gap: 16,
  },

  card: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    borderTopLeftRadius: 50,
    borderBottomEndRadius: 50,
    alignItems: 'center',
    elevation: 4,
  },

  value: {
    fontSize: 36,
    fontWeight: '700',
    color: '#222',
  },

  label: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
});
