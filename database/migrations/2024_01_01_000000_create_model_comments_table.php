<?php

#region USE

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Narsil\Auth\Models\User;
use Narsil\Tables\Models\ModelComment;

#endregion

return new class extends Migration
{
    #region MIGRATIONS

    /**
     * @return void
     */
    public function up(): void
    {
        $this->createModelCommentTable();
    }

    /**
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists(ModelComment::TABLE);
    }

    #endregion

    #region TABLES

    /**
     * @return void
     */
    private function createModelCommentTable(): void
    {
        if (Schema::hasTable(ModelComment::TABLE))
        {
            return;
        }

        Schema::create(ModelComment::TABLE, function (Blueprint $table)
        {
            $table
                ->id(ModelComment::ID);
            $table
                ->morphs(ModelComment::RELATIONSHIP_MODEL);
            $table
                ->text(ModelComment::CONTENT);
            $table
                ->foreignId(ModelComment::AUTHOR_ID)
                ->constrained(User::TABLE, User::ID)
                ->cascadeOnDelete();
            $table
                ->foreignId(ModelComment::LAST_EDITOR_ID)
                ->nullable()
                ->constrained(User::TABLE, User::ID)
                ->nullOnDelete();
            $table
                ->timestamps();
        });
    }

    #endregion
};
