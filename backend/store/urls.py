from django.urls import path
from . import views

urlpatterns = [

    path("products/", views.get_products),

    path("products/<int:pk>/", views.get_product),

    path("categories/", views.get_categories),

    path("search/", views.search_products),

    path("register/", views.register_user),

    path("login/", views.login_user),

    path("addresses/", views.addresses),

    path(
        "addresses/<int:pk>/",
        views.address_detail
    ),

    path(
        "orders/",
        views.create_order
    ),

    path(
        "my-orders/",
        views.my_orders
    ),
]