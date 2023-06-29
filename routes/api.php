<?php

use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\SaleController;
use App\Http\Controllers\Api\ReportClientController;
use App\Http\Controllers\Api\ReportProductController;
use App\Http\Controllers\Api\TinyProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:api')->get('/user', function (Request $request) {
    //return $request->user();
    return response()->json([
        'data'       =>"aqui"
    ]);
});


Route::post('login', [LoginController::class, 'login']);

Route::get('sales/index/{year?}/{month?}',                   [SaleController::class, 'index']);
Route::get('sales/proposal/{year?}/{month?}',                [SaleController::class, 'proposal']);
Route::get('sales/center/{center}/{year?}/{month?}',         [SaleController::class, 'center']);




Route::post('tiny/product/store',                           [TinyProductController::class, 'store'])->name('api.tiny.product.store');
Route::get('tiny/product/get_stock_products_by_id/{id}',    [TinyProductController::class, 'get_stock_products_by_id'])->name('api.tiny.product.get_stock_products_by_id');




Route::get('report/client/year_sales/{year?}/{center}',                      [ReportClientController::class, 'year_sales'])->name('report.client.year_sales');
Route::get('report/client/month_sales/{year?}/{month?}/{center}',            [ReportClientController::class, 'month_sales'])->name('report.client.month_sales');
Route::get('report/client/year_quantity/{year?}/{center}',                   [ReportClientController::class, 'year_quantity'])->name('report.client.year_quantity');
Route::get('report/client/month_quantity/{year?}/{month?}/{center}',         [ReportClientController::class, 'month_quantity'])->name('report.client.month_quantity');
Route::get('report/client/year_cac/{year?}/{center}',                        [ReportClientController::class, 'year_cac'])->name('report.client.year_cac');
Route::get('report/client/month_cac/{year?}/{month?}/{center}',              [ReportClientController::class, 'month_cac'])->name('report.client.month_cac');
Route::get('report/client/year_gender/{gender}/{year?}/{center}',            [ReportClientController::class, 'year_gender'])->name('report.client.year_gender');
Route::get('report/client/month_gender/{gender}/{year?}/{month?}/{center}',  [ReportClientController::class, 'month_gender'])->name('report.client.month_gender');


Route::get('report/product/index/{center}',                                      [ReportProductController::class, 'index'])->name('report.product.index');
Route::get('report/product/year_sales/{year?}/{center}',                         [ReportProductController::class, 'year_sales'])->name('report.product.year_sales');
Route::get('report/product/month_sales/{year?}/{month?}/{center}',               [ReportProductController::class, 'month_sales'])->name('report.product.month_sales');
Route::get('report/product/year_quantity/{year?}/{center}',                      [ReportProductController::class, 'year_quantity'])->name('report.product.year_quantity');
Route::get('report/product/month_quantity/{year?}/{month?}/{center}',            [ReportProductController::class, 'month_quantity'])->name('report.product.month_quantity');
