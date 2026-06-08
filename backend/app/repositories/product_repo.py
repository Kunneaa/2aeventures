from app.schemas.product import Category, Product


IMAGE_URLS: dict[str, str] = {
    "beef": "/images/products/beef-ribeye.jpg",
    "quail": "/images/products/whole-quail.jpg",
    "chicken": "/images/products/chicken-breast-fillet.jpg",
    "duck": "/images/products/duck-leg-quarter.jpg",
    "fish": "/images/products/whole-seabass.jpg",
    "seafood": "/images/products/half-shell-scallops.jpg",
    "pork": "/images/products/pork-belly.jpg",
    "shrimp": "/images/products/black-tiger-shrimp.jpg",
    "misc": "/images/products/mixed-frozen-items.jpg",
}

CATEGORIES: tuple[Category, ...] = (
    Category(
        id="beef",
        name={"en": "Beef", "vi": "Thịt bò"},
        image=IMAGE_URLS["beef"],
    ),
    Category(
        id="quail",
        name={"en": "Quail", "vi": "Cút"},
        image=IMAGE_URLS["quail"],
    ),
    Category(
        id="chicken",
        name={"en": "Chicken", "vi": "Gà"},
        image=IMAGE_URLS["chicken"],
    ),
    Category(
        id="duck",
        name={"en": "Duck", "vi": "Vịt"},
        image=IMAGE_URLS["duck"],
    ),
    Category(
        id="fish",
        name={"en": "Fish", "vi": "Cá"},
        image=IMAGE_URLS["fish"],
    ),
    Category(
        id="seafood",
        name={"en": "Seafood", "vi": "Hải sản"},
        image=IMAGE_URLS["seafood"],
    ),
    Category(
        id="pork",
        name={"en": "Pork", "vi": "Thịt heo"},
        image=IMAGE_URLS["pork"],
    ),
    Category(
        id="shrimp",
        name={"en": "Shrimp", "vi": "Tôm"},
        image=IMAGE_URLS["shrimp"],
    ),
    Category(
        id="misc",
        name={"en": "Misc", "vi": "Khác"},
        image=IMAGE_URLS["misc"],
    ),
)

PRODUCTS: tuple[Product, ...] = (
    Product(
        id="p-beef-1",
        name={"en": "US Beef Ribeye", "vi": "Thăn vai bò Mỹ"},
        categoryId="beef",
        image=IMAGE_URLS["beef"],
        unit={"en": "pound", "vi": "pound"},
        description={
            "en": "Premium marbled beef for wholesale distribution.",
            "vi": "Bò vân mỡ cao cấp cho phân phối sỉ.",
        },
    ),
    Product(
        id="p-quail-1",
        name={"en": "Whole Quail", "vi": "Cút nguyên con"},
        categoryId="quail",
        image=IMAGE_URLS["quail"],
        unit={"en": "pound", "vi": "pound"},
        description={
            "en": "Cleaned and frozen quail for restaurants and catering.",
            "vi": "Cút làm sạch cấp đông cho nhà hàng và suất ăn.",
        },
    ),
    Product(
        id="p-chicken-1",
        name={"en": "Chicken Breast Fillet", "vi": "Phi lê ức gà"},
        categoryId="chicken",
        image=IMAGE_URLS["chicken"],
        unit={"en": "pound", "vi": "pound"},
        description={
            "en": "Boneless chicken breast for high-volume kitchens.",
            "vi": "Ức gà không xương cho bếp công suất lớn.",
        },
    ),
    Product(
        id="p-duck-1",
        name={"en": "Duck Leg Quarter", "vi": "Đùi vịt góc tư"},
        categoryId="duck",
        image=IMAGE_URLS["duck"],
        unit={"en": "pound", "vi": "pound"},
        description={
            "en": "Imported duck cuts for roasting and premium menus.",
            "vi": "Phần vịt nhập khẩu cho món quay và menu cao cấp.",
        },
    ),
    Product(
        id="p-fish-1",
        name={"en": "Whole Seabass", "vi": "Cá chẽm nguyên con"},
        categoryId="fish",
        image=IMAGE_URLS["fish"],
        unit={"en": "pound", "vi": "pound"},
        description={
            "en": "Selected fish for restaurants and wholesale counters.",
            "vi": "Cá chọn lọc cho nhà hàng và kênh bán sỉ.",
        },
    ),
    Product(
        id="p-pork-1",
        name={"en": "Pork Belly", "vi": "Ba chỉ heo"},
        categoryId="pork",
        image=IMAGE_URLS["pork"],
        unit={"en": "pound", "vi": "pound"},
        description={
            "en": "Balanced pork cuts for grill and hotpot businesses.",
            "vi": "Thịt heo cân đối cho quán nướng và lẩu.",
        },
    ),
    Product(
        id="p-shrimp-1",
        name={"en": "Black Tiger Shrimp", "vi": "Tôm sú"},
        categoryId="shrimp",
        image=IMAGE_URLS["shrimp"],
        unit={"en": "pound", "vi": "pound"},
        description={
            "en": "Large shrimp for grill, hotpot, and banquet menus.",
            "vi": "Tôm size lớn cho nướng, lẩu và tiệc.",
        },
    ),
    Product(
        id="p-seafood-1",
        name={"en": "Half-Shell Scallops", "vi": "Sò điệp nửa mảnh"},
        categoryId="seafood",
        image=IMAGE_URLS["seafood"],
        unit={"en": "pound", "vi": "pound"},
        description={
            "en": "Frozen seafood products for premium kitchen operations.",
            "vi": "Hải sản cấp đông cho bếp chuyên nghiệp.",
        },
    ),
    Product(
        id="p-misc-1",
        name={"en": "Mixed Frozen Items", "vi": "Hàng đông lạnh tổng hợp"},
        categoryId="misc",
        image=IMAGE_URLS["misc"],
        unit={"en": "pound", "vi": "pound"},
        description={
            "en": "Flexible assorted products for seasonal demand.",
            "vi": "Nhóm sản phẩm linh hoạt theo nhu cầu mùa vụ.",
        },
    ),
)

PRODUCTS_BY_ID = {product.id: product for product in PRODUCTS}
CATEGORY_IDS = {category.id for category in CATEGORIES}


class ProductRepository:
    def list_categories(self) -> list[Category]:
        return list(CATEGORIES)

    def list_products(self) -> list[Product]:
        return list(PRODUCTS)

    def get_product(self, product_id: str) -> Product | None:
        return PRODUCTS_BY_ID.get(product_id)

    def category_exists(self, category_id: str) -> bool:
        return category_id in CATEGORY_IDS


product_repository = ProductRepository()
