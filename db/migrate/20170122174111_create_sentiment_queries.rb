class CreateSentimentQueries < ActiveRecord::Migration[5.0]
  def change
    create_table :sentiment_queries do |t|
      t.text :review_text
      t.integer :ground_truth

      t.timestamps
    end
  end
end
