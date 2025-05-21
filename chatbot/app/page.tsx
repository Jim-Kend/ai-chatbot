import Chat from '@/components/Chat';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Claude AI Chatbot</h1>
        <Chat />
      </div>
    </main>
  );
}