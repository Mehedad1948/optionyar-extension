// src/hooks/use-extension-stream.ts
import { useEffect } from 'react';
import { APP_URL } from '../lib/api'; // Ensure this points to your backend URL

export function useExtensionStream(onSignalReceived: (signal: any) => void) {
  useEffect(() => {
    // 1. Construct the full URL
    const url = `${APP_URL}/api/stream`;

    console.log("🔌 Connecting to SSE:", url);

    // 2. Initialize EventSource with credentials (cookies)
    const eventSource = new EventSource(url, { 
      withCredentials: true 
    });

    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        const { type, data } = payload;

        // Filter: We only care about new signals here
        // Adjust 'SIGNAL_CREATED' to match exactly what your backend sends in "type"
        if (type === 'SIGNAL_CREATED' || type === 'signal') { 
            console.log('🚀 New Signal Received:', data);
            onSignalReceived(data);
        }
      } catch (err) {
        console.error("Error parsing SSE data", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE Connection Error:', err);
      // Optional: Close connection on specific errors to prevent infinite loops
      // eventSource.close();
    };

    // Cleanup when component unmounts (user closes popup)
    return () => {
      eventSource.close();
    };
  }, [onSignalReceived]);
}
