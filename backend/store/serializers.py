from rest_framework import serializers

from .models import (
    Product,
    Category,
    Address,
    Order,
    OrderItem,
    Review,
)


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"



class ProductSerializer(serializers.ModelSerializer):

    category = CategorySerializer(read_only=True)

    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = "__all__"


    def get_image(self, obj):

        request = self.context.get("request")

        if not obj.image:
            return None

        if request:
            return request.build_absolute_uri(
                obj.image.url
            )

        return obj.image.url



# --------------------------
# Address
# --------------------------

class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = "__all__"

        read_only_fields = [
            "user"
        ]



# --------------------------
# Reviews
# --------------------------

class ReviewSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )


    class Meta:
        model = Review

        fields = [
            "id",
            "product",
            "user",
            "username",
            "rating",
            "comment",
            "created_at",
        ]

        read_only_fields = [
            "user"
        ]



# --------------------------
# Orders
# --------------------------

class OrderItemSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source="product.name",
        read_only=True
    )


    class Meta:
        model = OrderItem

        fields = [
            "id",
            "product",
            "product_name",
            "quantity",
            "price",
        ]



class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(
        many=True,
        read_only=True
    )


    class Meta:

        model = Order

        fields = [
            "id",
            "user",
            "address",
            "payment_method",
            "total_price",
            "status",
            "created_at",
            "items",
        ]

        read_only_fields = [
            "user",
            "status",
            "created_at",
        ]