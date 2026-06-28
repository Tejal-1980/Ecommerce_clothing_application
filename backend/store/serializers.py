from rest_framework import serializers
from .models import Product, Category


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

        # If request is available, return absolute URL, otherwise return relative URL
        if request is not None:
            return request.build_absolute_uri(obj.image.url)

        return obj.image.url