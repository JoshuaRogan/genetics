<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBugsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('bugs', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name');
			$table->string('email');
			$table->string('subject');
			$table->string('description');
			$table->string('status')->default('open');
			$table->timestamps();
			$table->softDeletes();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('bugs');
	}

}
