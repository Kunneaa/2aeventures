from app.core.brand import CHAT_PRODUCT_GROUPS, QUOTE_FLOW, CONTACT_REPLY, MATCH_REPLY, DEFAULT_REPLY
from app.schemas.chat import ChatSendRequest
from app.schemas.product import Product


class LlmService:
    def generate_reply(self, request: ChatSendRequest, matches: list[Product]) -> str:
        language = request.language or request.locale or "vi"
        lang_key = "vi" if language == "vi" else "en"
        message = request.message.casefold()

        if matches:
            names = ", ".join(product.name.vi if language == "vi" else product.name.en for product in matches)
            return MATCH_REPLY[lang_key].format(names=names)

        if any(keyword in message for keyword in ["quote", "quotation", "báo giá", "bao gia", "giá", "price"]):
            return QUOTE_FLOW[lang_key]

        if any(keyword in message for keyword in ["contact", "hotline", "zalo", "email", "liên hệ", "lien he"]):
            return CONTACT_REPLY[lang_key]

        groups = CHAT_PRODUCT_GROUPS[lang_key]
        return DEFAULT_REPLY[lang_key].format(groups=groups)


llm_service = LlmService()
