
import { Stack } from 'expo-router';

export default function RootLayoutNav() {
  
  return (
    
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="ProductPage" options={{ headerShown: false }} />
        
      </Stack>
    
  );
}
