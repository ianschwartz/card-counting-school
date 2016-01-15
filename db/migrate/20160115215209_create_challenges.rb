class CreateChallenges < ActiveRecord::Migration
  def change
    create_table :challenges do |t|
      t.integer :decks

      t.timestamps null: false
    end
  end
end
