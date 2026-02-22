import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const PageBody = ({ children, scrollable = true }) => {
  const { theme } = useTheme();

  const Container = scrollable ? ScrollView : View;

  return (
    <Container 
      style={[styles.body, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentPadding}
      showsVerticalScrollIndicator={false}
    >
      {children}
      {/* ایجاد یک فاصله خالی در انتها برای اینکه محتوا زیر فوتر شناور نرود */}
      <View style={{ height: 100 }} />
    </Container>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  contentPadding: {
    paddingHorizontal: 20,
    paddingTop: 10,
  }
});

export default PageBody;
