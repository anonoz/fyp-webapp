class CreatePredictionResults < ActiveRecord::Migration[5.0]
  def change
    create_table :prediction_results do |t|
      t.integer :sentiment_query_id
      t.integer :classifier_id
      t.integer :polarity
      t.float :confidence

      t.timestamps
    end
  end
end
