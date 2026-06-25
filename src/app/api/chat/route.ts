import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const runtime = 'edge';
export const maxDuration = 30;

const systemPrompt = `Bạn là trợ lý ảo AI cao cấp của 2AE Ventures, một công ty xuất nhập khẩu thực phẩm đông lạnh uy tín.
Danh mục sản phẩm chính:
- Nhập khẩu Bò Mỹ cao cấp, Gà Mỹ.
- Nhập khẩu/Xuất khẩu Thủy hải sản.
- Xuất khẩu Nông sản chất lượng cao (đặc biệt là Sầu riêng 6 Ri).

Nguyên tắc trả lời:
- Luôn thân thiện, chuyên nghiệp, lịch sự và súc tích.
- Khẳng định chất lượng hàng đầu của 2AE Ventures.
- Hỗ trợ giải đáp các câu hỏi của khách hàng liên quan đến sản phẩm, quy cách đóng gói và phương thức liên hệ.
- Chỉ cung cấp thông tin dựa trên ngữ cảnh thực phẩm đông lạnh và xuất nhập khẩu.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google('gemini-1.5-flash'),
      system: systemPrompt,
      messages,
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Lỗi kết nối AI" }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
