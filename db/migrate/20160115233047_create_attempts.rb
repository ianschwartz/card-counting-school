class CreateAttempts < ActiveRecord::Migration
  def change
    create_table :attempts do |t|
      t.references :user, index: true, foreign_key: true
      t.references :challenge, index: true, foreign_key: true
      t.boolean :successful, default: false

      t.timestamps null: false
    end
  end
end
