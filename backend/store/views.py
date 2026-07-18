
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
    Review,
    Address,
)

from .serializers import (
    ProductSerializer,
    CategorySerializer,
    ReviewSerializer,
    AddressSerializer,
)


# PRODUCTS

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
        id=pk
    )

    serializer = ProductSerializer(
        product,
        context={"request": request},
    )

    return Response(serializer.data)


# CATEGORY

@api_view(["GET"])
def get_categories(request):

    categories = Category.objects.all()

    serializer = CategorySerializer(
        categories,
        many=True
    )

    return Response(serializer.data)


# SEARCH

@api_view(["GET"])
def search_products(request):

    keyword = request.GET.get("q", "")

    products = Product.objects.filter(

        Q(name__icontains=keyword) |

        Q(description__icontains=keyword) |

        Q(category__name__icontains=keyword)

    ).distinct()

    serializer = ProductSerializer(
        products,
        many=True,
        context={"request": request},
    )

    return Response(serializer.data)


# FILTER

@api_view(["GET"])
def filter_products(request):

    queryset = Product.objects.all()

    category = request.GET.get("category")

    min_price = request.GET.get("min")

    max_price = request.GET.get("max")

    sort = request.GET.get("sort")

    if category:

        queryset = queryset.filter(
            category__name__iexact=category
        )

    if min_price:

        queryset = queryset.filter(
            price__gte=min_price
        )

    if max_price:

        queryset = queryset.filter(
            price__lte=max_price
        )

    if sort == "low":

        queryset = queryset.order_by("price")

    elif sort == "high":

        queryset = queryset.order_by("-price")

    elif sort == "new":

        queryset = queryset.order_by("-created_at")

    serializer = ProductSerializer(
        queryset,
        many=True,
        context={"request": request},
    )

    return Response(serializer.data)



# REVIEWS

@api_view(["GET"])
def get_reviews(request, pk):

    product = get_object_or_404(
        Product,
        id=pk
    )

    reviews = product.reviews.all()

    serializer = ReviewSerializer(
        reviews,
        many=True
    )

    return Response(serializer.data)


@api_view(["POST"])
def add_review(request):

    product_id = request.data.get("product")

    username = request.data.get("username")

    rating = request.data.get("rating")

    comment = request.data.get("comment")

    if not all([
        product_id,
        username,
        rating,
        comment
    ]):

        return Response(
            {
                "error": "All fields are required."
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    product = get_object_or_404(
        Product,
        id=product_id
    )

    user, created = User.objects.get_or_create(
        username=username
    )

    Review.objects.create(
        product=product,
        user=user,
        rating=rating,
        comment=comment,
    )

    reviews = product.reviews.all()

    total = reviews.count()

    avg = (
        sum(r.rating for r in reviews)
        / total
    )

    product.average_rating = round(avg, 1)

    product.total_reviews = total

    product.save()

    return Response(
        {
            "message": "Review Added Successfully"
        }
    )

@api_view(["GET"])
def get_addresses(request):

    username = request.GET.get("username")

    if not username:
        return Response(
            {"error": "Username is required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    addresses = Address.objects.filter(user=user)

    serializer = AddressSerializer(
        addresses,
        many=True,
    )

    return Response(serializer.data)


@api_view(["POST"])
def add_address(request):

    username = request.data.get("username")

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    data = request.data.copy()

    data["user"] = user.id

    serializer = AddressSerializer(data=data)

    if serializer.is_valid():

        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST,
    )


@api_view(["PUT"])
def update_address(request, pk):

    address = get_object_or_404(
        Address,
        id=pk
    )

    serializer = AddressSerializer(
        address,
        data=request.data,
        partial=True,
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST,
    )


@api_view(["DELETE"])
def delete_address(request, pk):

    address = get_object_or_404(
        Address,
        id=pk
    )

    address.delete()

    return Response(
        {
            "message": "Address Deleted Successfully"
        }
    )


# -------------------------
# REGISTER
# -------------------------

@api_view(["POST"])
def register_user(request):

    username = request.data.get("username")

    email = request.data.get("email")

    password = request.data.get("password")

    if not username or not email or not password:

        return Response(
            {
                "error": "All fields are required"
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    if User.objects.filter(
        username=username
    ).exists():

        return Response(
            {
                "error": "Username already exists"
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    User.objects.create_user(
        username=username,
        email=email,
        password=password,
    )

    return Response(
        {
            "message": "Registration Successful"
        }
    )


# -------------------------
# LOGIN
# -------------------------

@api_view(["POST"])
def login_user(request):

    username = request.data.get("username")

    password = request.data.get("password")

    user = authenticate(
        username=username,
        password=password,
    )

    if user:

        return Response(
            {
                "message": "Login Successful",
                "username": user.username,
            }
        )

    return Response(
        {
            "error": "Invalid Username or Password"
        },
        status=status.HTTP_401_UNAUTHORIZED,
    )