from app.schemas.chat import ChatSendRequest
from app.schemas.product import Product


class LlmService:
    def generate_reply(self, request: ChatSendRequest, matches: list[Product]) -> str:
        language = request.language or request.locale or "vi"
        message = request.message.casefold()

        if matches:
            names = ", ".join(product.name.vi if language == "vi" else product.name.en for product in matches)
            if language == "vi":
                return (
                    f"Mình tìm thấy {names}. Bạn có thể mở chi tiết sản phẩm, "
                    "thêm sản phẩm vào danh sách yêu cầu báo giá rồi gửi thông tin liên hệ để đội 2AEVENTURES phản hồi."
                )
            return (
                f"I found {names}. You can open the product detail, add products to the quote list, "
                "then send your contact details so 2AEVENTURES can follow up."
            )

        if any(keyword in message for keyword in ["quote", "quotation", "báo giá", "bao gia", "giá", "price"]):
            if language == "vi":
                return (
                    "Bạn thêm sản phẩm cần báo giá vào giỏ, nhập tên, email, công ty và số điện thoại. "
                    "Backend hiện đã ghi quote request thành file trên VPS để chưa cần database."
                )
            return (
                "Add the products to your quote cart, then submit your name, email, company and phone. "
                "The backend now saves quote requests as files on the VPS while database hosting is pending."
            )

        if any(keyword in message for keyword in ["contact", "hotline", "zalo", "email", "liên hệ", "lien he"]):
            if language == "vi":
                return "Bạn có thể để lại thông tin trên form liên hệ hoặc gửi yêu cầu báo giá để đội 2AEVENTURES phản hồi nhanh."
            return "You can leave your details through the contact form or submit a quote request for a quick follow-up."

        if language == "vi":
            return (
                "Mình có thể hỗ trợ tìm sản phẩm theo nhóm như bò, gà, vịt, cá, hải sản, tôm hoặc hàng đông lạnh tổng hợp. "
                "Bạn đang cần nhóm nào?"
            )
        return (
            "I can help you find products by category such as beef, chicken, duck, fish, seafood, shrimp or mixed frozen items. "
            "Which group are you looking for?"
        )


llm_service = LlmService()
