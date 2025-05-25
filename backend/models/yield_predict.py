# predict_yield.py
import sys
import cv2
import numpy as np
import pandas as pd
import joblib
import sys
from datetime import datetime


sys.stdout.reconfigure(encoding='utf-8')


# Load the trained model
model = joblib.load('yield_model.pkl')
# print("Model loaded from 'yield_model.pkl'")

# Function to detect tea plants from red-bordered area
def getTrees(image_path):
    image = cv2.imread(image_path)
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    lower_red1, upper_red1 = np.array([0, 120, 70]), np.array([10, 255, 255])
    lower_red2, upper_red2 = np.array([170, 120, 70]), np.array([180, 255, 255])

    mask1 = cv2.inRange(hsv, lower_red1, upper_red1)
    mask2 = cv2.inRange(hsv, lower_red2, upper_red2)
    red_mask = cv2.bitwise_or(mask1, mask2)

    contours, _ = cv2.findContours(red_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    if contours:
        largest_contour = max(contours, key=cv2.contourArea)
        mask = np.zeros(image.shape[:2], dtype=np.uint8)
        cv2.drawContours(mask, [largest_contour], -1, 255, thickness=cv2.FILLED)

        filled_contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        enclosed_area = cv2.contourArea(filled_contours[0])

        scale = 0.05  # Adjust this based on real-world calibration
        real_world_area = enclosed_area * scale

        # Estimate area taken by tall/small trees
        tall_tree_spacing, small_tree_spacing = 12 * 10, 10 * 6
        tall_tree_area, small_tree_area = 3, 4

        num_tall_trees = real_world_area // tall_tree_spacing
        num_small_trees = real_world_area // small_tree_spacing

        area_tall = num_tall_trees * tall_tree_area
        area_small = num_small_trees * small_tree_area

        remaining_area = real_world_area - (area_tall + area_small)

        # Tea plant spacing
        row_spacing, within_row_spacing = 4 * 0.3048, 2 * 0.3048
        area_per_plant = row_spacing * within_row_spacing
        num_tea_plants = remaining_area / area_per_plant

        return round(num_tea_plants, 0)

    return 0

# Function to predict yield for a date range
def predict_yield_with_tree_count(start_date_str, end_date_str, tree_count):
    start_date = pd.to_datetime(start_date_str)
    end_date = pd.to_datetime(end_date_str)
    date_range = pd.date_range(start=start_date, end=end_date)

    prediction_df = pd.DataFrame({
        'date': date_range,
        'no of trees': tree_count,
        'month': date_range.month
    })

    X_input = prediction_df[['no of trees', 'month']]
    prediction_df['predicted_yield'] = model.predict(X_input)
    total_yield = prediction_df['predicted_yield'].sum()

    # print(f"\nYield prediction from {start_date_str} to {end_date_str} with {tree_count} trees:")
    # print(prediction_df[['date', 'no of trees', 'month', 'predicted_yield']])
    print(f"\nTotal predicted yield: {total_yield:.2f} Kilograms")

# --------- Entry point for testing ---------
if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: Aruguments not provided. Please provide the image path, start date, and end date.")
    else:
        image_path = sys.argv[1]
        start_date = sys.argv[2]
        end_date = sys.argv[3]

        trees = getTrees(image_path)
        # print(f"Detected tea plants: {trees}")
        predict_yield_with_tree_count(start_date, end_date, trees)
