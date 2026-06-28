from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer


@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()

    serializer = ProductSerializer(
        products,
        many=True,
        context={"request": request}
    )

    return Response(serializer.data)


@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()

    serializer = CategorySerializer(
        categories,
        many=True
    )

    return Response(serializer.data)


@api_view(['GET'])
def get_product(request, pk):
    try:
        product = Product.objects.get(id=pk)

    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = ProductSerializer(
        product,
        context={"request": request}
    )

    return Response(serializer.data)


@api_view(['POST'])
def register_user(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username or not email or not password:
        return Response(
            {"error": "All fields are required"},
            status=400
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "User already exists"}
        )

    User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response({
        "message": "Registration successful"
    })


@api_view(['POST'])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"error": "All fields are required"},
            status=400
        )

    if not User.objects.filter(username=username).exists():
        return Response(
            {"error": "User does not exist"},
            status=404
        )

    user = authenticate(
        username=username,
        password=password
    )

    if user:
        return Response({
            "message": "Login successful"
        })

    return Response(
        {"error": "Invalid credentials"},
        status=401
    )