from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import (
    Product,
    Category,
    Address,
    Order,
    OrderItem,
)

from .serializers import (
    ProductSerializer,
    CategorySerializer,
    AddressSerializer,
    OrderSerializer,
)


# -------------------------
# PRODUCTS
# -------------------------

@api_view(["GET"])
def get_products(request):

    products = Product.objects.all().order_by("-created_at")

    serializer = ProductSerializer(
        products,
        many=True,
        context={"request": request},
    )

    return Response(serializer.data)


@api_view(["GET"])
def get_product(request, pk):

    product = get_object_or_404(
        Product,
        id=pk,
    )

    serializer = ProductSerializer(
        product,
        context={"request": request},
    )

    return Response(serializer.data)


# -------------------------
# CATEGORY
# -------------------------

@api_view(["GET"])
def get_categories(request):

    categories = Category.objects.all()

    serializer = CategorySerializer(
        categories,
        many=True,
    )

    return Response(serializer.data)


# -------------------------
# SEARCH
# -------------------------

@api_view(["GET"])
def search_products(request):

    keyword = request.GET.get("q", "").strip()

    if not keyword:

        return Response([])

    products = Product.objects.filter(

        Q(name__icontains=keyword)

        |

        Q(description__icontains=keyword)

    )

    serializer = ProductSerializer(

        products,

        many=True,

        context={"request": request},

    )

    return Response(serializer.data)


# -------------------------
# AUTH
# -------------------------

@api_view(["POST"])
def register_user(request):

    username = request.data.get("username")

    email = request.data.get("email")

    password = request.data.get("password")

    if not username or not email or not password:

        return Response(

            {"error": "All fields are required"},

            status=400,

        )

    if User.objects.filter(username=username).exists():

        return Response(

            {"error": "Username already exists"},

            status=400,

        )

    User.objects.create_user(

        username=username,

        email=email,

        password=password,

    )

    return Response(

        {"message": "Registration successful"}

    )


@api_view(["POST"])
def login_user(request):

    username = request.data.get("username")

    password = request.data.get("password")

    user = authenticate(

        username=username,

        password=password,

    )

    if user:

        return Response({

            "message": "Login successful",

            "user_id": user.id,

            "username": user.username,

        })

    return Response(

        {"error": "Invalid credentials"},

        status=401,

    )
# -------------------------
# ADDRESS
# -------------------------

@api_view(["GET", "POST"])
def addresses(request):

    user = User.objects.first()

    if request.method == "GET":

        addresses = Address.objects.filter(user=user)

        serializer = AddressSerializer(
            addresses,
            many=True,
        )

        return Response(serializer.data)

    serializer = AddressSerializer(
        data=request.data
    )

    if serializer.is_valid():

        if serializer.validated_data.get("is_primary"):

            Address.objects.filter(
                user=user,
                is_primary=True
            ).update(is_primary=False)

        serializer.save(user=user)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["PUT", "DELETE"])
def address_detail(request, pk):

    address = get_object_or_404(
        Address,
        pk=pk
    )

    if request.method == "PUT":

        serializer = AddressSerializer(
            address,
            data=request.data
        )

        if serializer.is_valid():

            if serializer.validated_data.get("is_primary"):

                Address.objects.filter(
                    user=address.user,
                    is_primary=True
                ).exclude(id=address.id).update(
                    is_primary=False
                )

            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=400
        )

    address.delete()

    return Response(
        {"message": "Address deleted"}
    )


# -------------------------
# ORDERS
# -------------------------

@api_view(["POST"])
def create_order(request):

    user = User.objects.first()

    address = get_object_or_404(
        Address,
        id=request.data.get("address")
    )

    order = Order.objects.create(
        user=user,
        address=address,
        payment_method=request.data.get("payment_method"),
        total_price=request.data.get("total_price")
    )

    items = request.data.get("items", [])

    for item in items:

        product = get_object_or_404(
            Product,
            id=item["product"]
        )

        OrderItem.objects.create(
            order=order,
            product=product,
            quantity=item["quantity"],
            price=item["price"]
        )

    serializer = OrderSerializer(order)

    return Response(
        serializer.data,
        status=201
    )


@api_view(["GET"])
def my_orders(request):

    user = User.objects.first()

    orders = Order.objects.filter(
        user=user
    ).order_by("-created_at")

    serializer = OrderSerializer(
        orders,
        many=True
    )

    return Response(serializer.data)