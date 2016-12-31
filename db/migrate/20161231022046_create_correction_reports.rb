class CreateCorrectionReports < ActiveRecord::Migration[5.0]
  def change
    create_table :correction_reports do |t|
      t.text :review_text
      t.integer :polarity, default: 0

      t.timestamps
    end
  end
end
