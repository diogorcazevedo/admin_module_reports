<?php

use App\Http\Controllers\DashBoardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JewelsController;
use App\Http\Controllers\ManufacturerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductGemsController;
use App\Http\Controllers\ProductGoldsController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\ProductManufacturersController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProposalController;
use App\Http\Controllers\Report\ReportCategoryController;
use App\Http\Controllers\Report\ReportCenterController;
use App\Http\Controllers\Report\ReportCityController;
use App\Http\Controllers\Report\ReportClientController;
use App\Http\Controllers\Report\ReportCollectionController;
use App\Http\Controllers\Report\ReportController;
use App\Http\Controllers\Report\ReportPositionController;
use App\Http\Controllers\Report\ReportProductController;
use App\Http\Controllers\Report\ReportSaleController;
use App\Http\Controllers\Report\ReportSellerController;
use App\Http\Controllers\Report\ReportStateController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\ShippingReverseLogisticController;
use App\Http\Controllers\ShippingSigepeController;
use App\Http\Controllers\SigepeController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return redirect()->route('login');
});


Route::get('/',                                                   [DashBoardController::class, 'index'])->name('index')->middleware(['auth', 'verified','check']);
Route::get('/index',                                              [DashBoardController::class, 'index'])->name('dashboard')->middleware(['auth', 'verified','check']);
Route::get('/dashboard',                                          [DashBoardController::class, 'index'])->name('dashboard')->middleware(['auth', 'verified','check']);
Route::get('/dashboard/index',                                    [DashBoardController::class, 'index'])->name('dashboard')->middleware(['auth', 'verified','check']);


Route::middleware(['auth', 'verified','check'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/home', [HomeController::class, 'index'])->name('home')->middleware(['auth', 'verified','check']);



Route::middleware(['auth', 'verified','check','auth.session'])->group(function () {

    Route::any('user/index',                                          [UserController::class, 'index'])->name('user.index')->middleware(['auth', 'verified','check']);
    Route::get('user/paginate/{letter}',                              [UserController::class, 'paginate'])->name('user.paginate')->middleware(['auth', 'verified','check']);
    Route::get('user/create',                                         [UserController::class, 'create'])->name('user.create')->middleware(['auth', 'verified','check']);
    Route::post('user/store',                                         [UserController::class, 'store'])->name('user.store')->middleware(['auth', 'verified','check']);
    Route::get('user/edit/{user}',                                    [UserController::class, 'edit'])->name('user.edit')->middleware(['auth', 'verified','check']);
    Route::post('user/update/{user}',                                 [UserController::class, 'update'])->name('user.update')->middleware(['auth', 'verified','check']);
    Route::get('user/destroy/{user}',                                 [UserController::class, 'destroy'])->name('user.destroy')->middleware(['auth', 'verified','check']);
    Route::get('user/password/{user}',                                [UserController::class, 'password'])->name('user.password')->middleware(['auth', 'verified','check']);
    Route::get('user/update_password/{user}',                         [UserController::class, 'update_password'])->name('user.update.password')->middleware(['auth', 'verified','check']);
    Route::get('user/birthdays',                                      [UserController::class, 'birthdays'])->name('user.birthdays')->middleware(['auth', 'verified','check']);
    Route::get('user/print_address/{user}',                           [UserController::class, 'print_address'])->name('user.print.address')->middleware(['auth', 'verified','check']);

    Route::get('user/images/index/{user}',                              [UserController::class, 'images'])->name('user.images.index')->middleware(['auth', 'verified','check']);
    Route::post('user/image/store/{user}',                              [UserController::class, 'imageStore'])->name('user.image.store')->middleware(['auth', 'verified','check']);
    Route::get('user/image_destroy/{image}',                            [UserController::class, 'imageDestroy'])->name('user.image.destroy')->middleware(['auth', 'verified','check']);


});

Route::middleware(['auth', 'verified','check','auth.session'])->group(function () {

    Route::get('manufacturer/index',             [ManufacturerController::class, 'index'])->name('manufacturer.index');
    Route::get('manufacturer/show/{id}',         [ManufacturerController::class, 'show'])->name('manufacturer.show');
    Route::get('manufacturer/create',            [ManufacturerController::class, 'create'])->name('manufacturer.create');
    Route::post('manufacturer/store',            [ManufacturerController::class, 'store'])->name('manufacturer.store');
    Route::get('manufacturer/edit/{id}',         [ManufacturerController::class, 'edit'])->name('manufacturer.edit');
    Route::post('manufacturer/update/{id}',      [ManufacturerController::class, 'update'])->name('manufacturer.update');
    Route::get('manufacturer/destroy/{id}',      [ManufacturerController::class, 'destroy'])->name('manufacturer.destroy');


    Route::get('supplier/index',                [SupplierController::class, 'index'])->name('supplier.index');
    Route::get('supplier/show/{id}',            [SupplierController::class, 'show'])->name('supplier.show');
    Route::get('supplier/create',               [SupplierController::class, 'create'])->name('supplier.create');
    Route::post('supplier/store',               [SupplierController::class, 'store'])->name('supplier.store');
    Route::get('supplier/edit/{id}',            [SupplierController::class, 'edit'])->name('supplier.edit');
    Route::post('supplier/update/{id}',         [SupplierController::class, 'update'])->name('supplier.update');
    Route::get('supplier/destroy/{id}',         [SupplierController::class, 'destroy'])->name('supplier.destroy');


    Route::get('jewel/images/{jewel}',                  [JewelsController::class, 'images'])->name('jewels.images.index');
    Route::post('jewel/image/store/{jewel}',            [JewelsController::class, 'imageStore'])->name('jewels.image.store');
    Route::get('jewel/image/destroy/{image}',           [JewelsController::class, 'imageDestroy'])->name('jewels.image.destroy');
    Route::get('jewel/image/download/{image}',          [JewelsController::class, 'download'])->name('jewels.image.download');


    Route::any('jewel/index/{collection?}/{category?}',  [JewelsController::class, 'index'])->name('jewels.index');
    Route::get('jewel/show/{id}',                        [JewelsController::class, 'show'])->name('jewels.show');
    Route::get('jewel/create',                           [JewelsController::class, 'create'])->name('jewels.create');
    Route::post('jewel/store',                           [JewelsController::class, 'store'])->name('jewels.store');
    Route::get('jewel/edit/{id}',                        [JewelsController::class, 'edit'])->name('jewels.edit');
    Route::post('jewel/update/{id}',                     [JewelsController::class, 'update'])->name('jewels.update');
    Route::get('jewel/destroy/{id}',                     [JewelsController::class, 'destroy'])->name('jewels.destroy');


    Route::any('product/index/{collection?}/{category?}',             [ProductController::class, 'index'])->name('product.index');
    Route::get('product/show/{product}',                              [ProductController::class, 'show'])->name('product.show');
    Route::get('product/jewel_products/index/{jewel}',                [ProductController::class, 'jewel_products'])->name('product.jewel_products.index');
    Route::get('product/create/{jewel}',                              [ProductController::class, 'create'])->name('product.create');
    Route::post('product/store',                                      [ProductController::class, 'store'])->name('product.store');
    Route::get('product/edit/{product}',                              [ProductController::class, 'edit'])->name('product.edit');
    Route::post('product/update/{product}',                           [ProductController::class, 'update'])->name('product.update');
    Route::get('product/destroy/{product}',                           [ProductController::class, 'destroy'])->name('product.destroy');

    Route::post('product/sku_change',                                 [ProductController::class, 'sku_change'])->name('product.sku.change')->middleware(['auth', 'verified','check']);

    Route::get('product/images/index/{product}',                      [ProductController::class, 'images'])->name('product.images.index');
    Route::post('product/image/store/{product}',                      [ProductController::class, 'imageStore'])->name('product.image.store');
    Route::get('product/image_destroy/{image}',                       [ProductController::class, 'imageDestroy'])->name('product.image.destroy');

    Route::post('product/price_change/{product}',                     [ProductController::class, 'price_change'])->name('product.price.change');
    Route::post('product/price_store/{product}',                      [ProductController::class, 'price_store'])->name('product.price.store');
    Route::get('product/image/download/{id}',                         [ProductImageController::class, 'download'])->name('product.image.download');

    Route::post('product/gold/add',                                   [ProductGoldsController::class, 'add'])->name('product.gold.add');
    Route::get('product/gold/remove/{product_gold}',                  [ProductGoldsController::class, 'remove'])->name('product.gold.remove');

    Route::post('product/gem/add',                                    [ProductGemsController::class, 'add'])->name('product.gem.add');
    Route::get('product/gem/remove/{product_gem}',                    [ProductGemsController::class, 'remove'])->name('product.gem.remove');

    Route::get('product/manufacturer/create/{component}',             [ProductManufacturersController::class, 'create'])->name('jewels.component.manufacturer.create');
    Route::post('product/manufacturer/store',                         [ProductManufacturersController::class, 'store'])->name('jewels.component.manufacturer.store');
    Route::post('product/manufacturer/update/{id}',                   [ProductManufacturersController::class, 'update'])->name('jewels.component.manufacturer.update');


});



Route::middleware(['auth', 'verified','check','auth.session'])->group(function () {

    Route::any('order/client',                                        [OrderController::class, 'client'])->name('order.client')->middleware(['auth', 'verified','check']);
    Route::get('order/store/{user}',                                  [OrderController::class, 'store'])->name('order.store')->middleware(['auth', 'verified','check']);
    Route::any('order/product/{order}/{collection?}/{category?}',     [OrderController::class, 'product'])->name('order.product')->middleware(['auth', 'verified','check']);
    Route::get('order/add/{order}/{product}',                         [OrderController::class, 'add'])->name('order.add')->middleware(['auth', 'verified','check']);
    Route::get('order/remove/{orderItem}',                            [OrderController::class, 'remove'])->name('order.remove')->middleware(['auth', 'verified','check']);
    Route::get('order/edit/{order}',                                  [OrderController::class, 'edit'])->name('order.edit')->middleware(['auth', 'verified','check']);
    Route::post('order/update/{order}',                               [OrderController::class, 'update'])->name('order.update')->middleware(['auth', 'verified','check']);
    Route::get('order/links/{order}',                                 [OrderController::class, 'links'])->name('order.links')->middleware(['auth', 'verified','check']);
    Route::get('order/destroy/{order}',                               [OrderController::class, 'destroy'])->name('order.destroy')->middleware(['auth', 'verified','check']);
    Route::get('order/chargeback/{id}',                               [OrderController::class, 'chargeback'])->name('order.chargeback')->middleware(['auth', 'verified','check']);

    Route::get('sales/index/{year?}/{month?}',                        [SaleController::class, 'index'])->name('sales.index')->middleware(['auth', 'verified','check']);
    Route::get('proposal/index/{year?}/{month?}',                     [ProposalController::class, 'index'])->name('proposal.index')->middleware(['auth', 'verified','check']);


    Route::get('shipping/open',                                        [ShippingController::class, 'open'])->name('shipping.open')->middleware(['auth', 'verified','check']);
    Route::get('shipping/index/{order}',                               [ShippingController::class, 'index'])->name('shipping.index')->middleware(['auth', 'verified','check']);
    Route::get('shipping/get_all/{order}',                             [ShippingController::class, 'get_all'])->name('shipping.get_all')->middleware(['auth', 'verified','check']);
    Route::get('shipping/reverse/{order}',                             [ShippingController::class, 'reverse'])->name('shipping.reverse')->middleware(['auth', 'verified','check']);
    Route::get('shipping/status/{order}',                              [ShippingController::class, 'status'])->name('shipping.status')->middleware(['auth', 'verified','check']);
    Route::post('shipping/store/{order}',                              [ShippingController::class, 'store'])->name('shipping.store')->middleware(['auth', 'verified','check']);
    Route::post('shipping/update/{shipping}',                          [ShippingController::class, 'update'])->name('shipping.update')->middleware(['auth', 'verified','check']);
    Route::get('shipping/add_item/{shipping}/{product}',               [ShippingController::class, 'add_item'])->name('shipping.add.item')->middleware(['auth', 'verified','check']);
    Route::get('shipping/destroy_item/{shippingItems}',                [ShippingController::class, 'destroy_item'])->name('shipping.destroy.item')->middleware(['auth', 'verified','check']);
    Route::get('shipping/print_shipping_address/{order}',              [ShippingController::class, 'print_shipping_address'])->name('print.shipping.address')->middleware(['auth', 'verified','check']);


    Route::get('shipping/sigepe/index/{order}',                         [ShippingSigepeController::class, 'index'])->name('shipping.sigepe.index')->middleware(['auth', 'verified','check']);
    Route::get('shipping/sigepe/create/{order}',                        [ShippingSigepeController::class, 'create'])->name('shipping.sigepe.create')->middleware(['auth', 'verified','check']);
    Route::post('shipping/sigepe/store/{order}',                        [ShippingSigepeController::class, 'store'])->name('shipping.sigepe.store')->middleware(['auth', 'verified','check']);
    Route::get('shipping/sigepe/edit/{order}',                          [ShippingSigepeController::class, 'edit'])->name('shipping.sigepe.edit')->middleware(['auth', 'verified','check']);
    Route::post('shipping/sigepe/update/{order}',                       [ShippingSigepeController::class, 'update'])->name('shipping.sigepe.update')->middleware(['auth', 'verified','check']);


    Route::get('shipping/reverse_logistic/index',                      [ShippingReverseLogisticController::class, 'index'])->name('shipping.reverse.logistic.index')->middleware(['auth', 'verified','check']);
    Route::get('shipping/reverse_logistic/show/{order}',               [ShippingReverseLogisticController::class, 'show'])->name('shipping.reverse.logistic.show')->middleware(['auth', 'verified','check']);
    Route::post('shipping/reverse_logistic/store/{order}',             [ShippingReverseLogisticController::class, 'store'])->name('shipping.reverse.logistic.store')->middleware(['auth', 'verified','check']);
    Route::post('shipping/reverse_logistic/update/{reverse}',          [ShippingReverseLogisticController::class, 'update'])->name('shipping.reverse.logistic.update')->middleware(['auth', 'verified','check']);
    Route::delete('shipping/reverse_logistic/destroy/{reverse}',       [ShippingReverseLogisticController::class, 'destroy'])->name('shipping.reverse.logistic.destroy')->middleware(['auth', 'verified','check']);



    Route::get('sigepe/index',                                          [SigepeController::class, 'index'])->name('sigepe.index')->middleware(['auth', 'verified','check']);
    Route::get('sigepe/create',                                         [SigepeController::class, 'create'])->name('sigepe.create')->middleware(['auth', 'verified','check']);
    Route::post('sigepe/store',                                         [SigepeController::class, 'store'])->name('sigepe.store')->middleware(['auth', 'verified','check']);


    Route::get('report/index',                                              [ReportController::class, 'index'])->name('report.index')->middleware(['auth', 'verified','check']);
    Route::get('report/sale/index',                                         [ReportSaleController::class, 'index'])->name('report.sale.index')->middleware(['auth', 'verified','check']);

    Route::get('report/product/index',                                      [ReportProductController::class, 'index'])->name('report.product.index')->middleware(['auth', 'verified','check']);
    Route::get('report/product/year_sales/{year?}',                         [ReportProductController::class, 'year_sales'])->name('report.product.year_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/product/month_sales/{year?}/{month?}',               [ReportProductController::class, 'month_sales'])->name('report.product.month_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/product/year_quantity/{year?}',                      [ReportProductController::class, 'year_quantity'])->name('report.product.year_quantity')->middleware(['auth', 'verified','check']);
    Route::get('report/product/month_quantity/{year?}/{month?}',            [ReportProductController::class, 'month_quantity'])->name('report.product.month_quantity')->middleware(['auth', 'verified','check']);

    Route::get('report/collection/index',                                                       [ReportCollectionController::class, 'index'])->name('report.collection.index')->middleware(['auth', 'verified','check']);
    Route::get('report/collection/year_sales/{year?}',                                          [ReportCollectionController::class, 'year_sales'])->name('report.collection.year_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/collection/month_sales/{year?}/{month?}',                                [ReportCollectionController::class, 'month_sales'])->name('report.collection.month_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/collection/year_quantity/{year?}',                                       [ReportCollectionController::class, 'year_quantity'])->name('report.collection.year_quantity')->middleware(['auth', 'verified','check']);
    Route::get('report/collection/month_quantity/{year?}/{month?}',                             [ReportCollectionController::class, 'month_quantity'])->name('report.collection.month_quantity')->middleware(['auth', 'verified','check']);
    Route::get('report/collection/product_year_sales/{year?}/{collection?}',                    [ReportCollectionController::class, 'product_year_sales'])->name('report.collection.product_year_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/collection/product_month_sales/{year?}/{month?}/{collection?}',          [ReportCollectionController::class, 'product_month_sales'])->name('report.collection.product_month_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/collection/product_year_quantity/{year?}/{collection?}',                 [ReportCollectionController::class, 'product_year_quantity'])->name('report.collection.product_year_quantity')->middleware(['auth', 'verified','check']);
    Route::get('report/collection/product_month_quantity/{year?}/{month?}/{collection?}',       [ReportCollectionController::class, 'product_month_quantity'])->name('report.collection.product_month_quantity')->middleware(['auth', 'verified','check']);

    Route::get('report/collection/user_year_sales/{year?}/{collection?}',                       [ReportCollectionController::class, 'user_year_sales'])->name('report.collection.user_year_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/collection/user_month_sales/{year?}/{month?}/{collection?}',             [ReportCollectionController::class, 'user_month_sales'])->name('report.collection.user_month_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/collection/user_year_quantity/{year?}/{collection?}',                    [ReportCollectionController::class, 'user_year_quantity'])->name('report.collection.user_year_quantity')->middleware(['auth', 'verified','check']);
    Route::get('report/collection/user_month_quantity/{year?}/{month?}/{collection?}',          [ReportCollectionController::class, 'user_month_quantity'])->name('report.collection.user_month_quantity')->middleware(['auth', 'verified','check']);


    Route::get('report/category/index',                                                       [ReportCategoryController::class, 'index'])->name('report.category.index')->middleware(['auth', 'verified','check']);
    Route::get('report/category/year_sales/{year?}',                                          [ReportCategoryController::class, 'year_sales'])->name('report.category.year_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/category/month_sales/{year?}/{month?}',                                [ReportCategoryController::class, 'month_sales'])->name('report.category.month_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/category/year_quantity/{year?}',                                       [ReportCategoryController::class, 'year_quantity'])->name('report.category.year_quantity')->middleware(['auth', 'verified','check']);
    Route::get('report/category/month_quantity/{year?}/{month?}',                             [ReportCategoryController::class, 'month_quantity'])->name('report.category.month_quantity')->middleware(['auth', 'verified','check']);
    Route::get('report/category/product_year_sales/{year?}/{collection?}',                    [ReportCategoryController::class, 'product_year_sales'])->name('report.category.product_year_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/category/product_month_sales/{year?}/{month?}/{collection?}',          [ReportCategoryController::class, 'product_month_sales'])->name('report.category.product_month_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/category/product_year_quantity/{year?}/{collection?}',                 [ReportCategoryController::class, 'product_year_quantity'])->name('report.category.product_year_quantity')->middleware(['auth', 'verified','check']);
    Route::get('report/category/product_month_quantity/{year?}/{month?}/{collection?}',       [ReportCategoryController::class, 'product_month_quantity'])->name('report.category.product_month_quantity')->middleware(['auth', 'verified','check']);



    Route::get('report/client/index',                                   [ReportClientController::class, 'index'])->name('report.client.index')->middleware(['auth', 'verified','check']);
    Route::get('report/client/year_sales/{year?}',                      [ReportClientController::class, 'year_sales'])->name('report.client.year_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/client/month_sales/{year?}/{month?}',            [ReportClientController::class, 'month_sales'])->name('report.client.month_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/client/year_quantity/{year?}',                   [ReportClientController::class, 'year_quantity'])->name('report.client.year_quantity')->middleware(['auth', 'verified','check']);
    Route::get('report/client/month_quantity/{year?}/{month?}',         [ReportClientController::class, 'month_quantity'])->name('report.client.month_quantity')->middleware(['auth', 'verified','check']);
    Route::get('report/client/year_cac/{year?}',                        [ReportClientController::class, 'year_cac'])->name('report.client.year_cac')->middleware(['auth', 'verified','check']);
    Route::get('report/client/month_cac/{year?}/{month?}',              [ReportClientController::class, 'month_cac'])->name('report.client.month_cac')->middleware(['auth', 'verified','check']);
    Route::get('report/client/year_gender/{gender}/{year?}',            [ReportClientController::class, 'year_gender'])->name('report.client.year_gender')->middleware(['auth', 'verified','check']);
    Route::get('report/client/month_gender/{gender}/{year?}/{month?}',  [ReportClientController::class, 'month_gender'])->name('report.client.month_gender')->middleware(['auth', 'verified','check']);


    Route::get('report/seller/index',                                   [ReportSellerController::class, 'index'])->name('report.seller.index')->middleware(['auth', 'verified','check']);
    Route::get('report/seller/year_sales/{year?}',                      [ReportSellerController::class, 'year_sales'])->name('report.seller.year_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/seller/month_sales/{year?}/{month?}',            [ReportSellerController::class, 'month_sales'])->name('report.seller.month_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/seller/year_quantity/{year?}',                   [ReportSellerController::class, 'year_quantity'])->name('report.seller.year_quantity')->middleware(['auth', 'verified','check']);
    Route::get('report/seller/month_quantity/{year?}/{month?}',         [ReportSellerController::class, 'month_quantity'])->name('report.seller.month_quantity')->middleware(['auth', 'verified','check']);



    Route::get('report/position/index',                              [ReportPositionController::class, 'index'])->name('report.position.index')->middleware(['auth', 'verified','check']);

    Route::get('report/state/index',                                 [ReportStateController::class, 'index'])->name('report.state.index')->middleware(['auth', 'verified','check']);
    Route::get('report/state/year_sales/{year?}',                    [ReportStateController::class, 'year_sales'])->name('report.state.year_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/state/month_sales/{year?}/{month?}',          [ReportStateController::class, 'month_sales'])->name('report.state.month_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/state/year_quantity/{year?}',                 [ReportStateController::class, 'year_quantity'])->name('report.state.year_quantity')->middleware(['auth', 'verified','check']);
    Route::get('report/state/month_quantity/{year?}/{month?}',       [ReportStateController::class, 'month_quantity'])->name('report.state.month_quantity')->middleware(['auth', 'verified','check']);

    Route::get('report/city/index',                                   [ReportCityController::class, 'index'])->name('report.city.index')->middleware(['auth', 'verified','check']);
    Route::get('report/city/year_sales/{year?}',                      [ReportCityController::class, 'year_sales'])->name('report.city.year_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/city/month_sales/{year?}/{month?}',            [ReportCityController::class, 'month_sales'])->name('report.city.month_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/city/year_quantity/{year?}',                   [ReportCityController::class, 'year_quantity'])->name('report.city.year_quantity')->middleware(['auth', 'verified','check']);
    Route::get('report/city/month_quantity/{year?}/{month?}',         [ReportCityController::class, 'month_quantity'])->name('report.city.month_quantity')->middleware(['auth', 'verified','check']);


    Route::get('report/center/index',                                 [ReportCenterController::class, 'index'])->name('report.center.index')->middleware(['auth', 'verified','check']);
    Route::get('report/center/year_sales/{year?}',                    [ReportCenterController::class, 'year_sales'])->name('report.center.year_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/center/month_sales/{year?}/{month?}',          [ReportCenterController::class, 'month_sales'])->name('report.center.month_sales')->middleware(['auth', 'verified','check']);
    Route::get('report/center/year_quantity/{year?}',                 [ReportCenterController::class, 'year_quantity'])->name('report.center.year_quantity')->middleware(['auth', 'verified','check']);
    Route::get('report/center/month_quantity/{year?}/{month?}',       [ReportCenterController::class, 'month_quantity'])->name('report.center.month_quantity')->middleware(['auth', 'verified','check']);


});

require __DIR__.'/auth.php';
