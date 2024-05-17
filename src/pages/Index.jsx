import React, { useState, useEffect, useRef } from "react";
import { Container, VStack, HStack, Input, Button, Text, Box, Avatar, IconButton } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: input,
      sender: "User",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Box width="100%" height="70vh" overflowY="auto" border="1px solid #e2e8f0" borderRadius="md" p={4}>
          {messages.map((message) => (
            <HStack key={message.id} spacing={3} alignItems="flex-start" mb={3}>
              <Avatar name={message.sender} />
              <Box>
                <Text fontWeight="bold">{message.sender}</Text>
                <Text>{message.text}</Text>
                <Text fontSize="xs" color="gray.500">
                  {message.timestamp}
                </Text>
              </Box>
            </HStack>
          ))}
          <div ref={messagesEndRef} />
        </Box>
        <HStack width="100%">
          <Input placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} />
          <IconButton aria-label="Send" icon={<FaPaperPlane />} onClick={handleSendMessage} />
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
