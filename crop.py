import pandas as pd 
df = pd.read_csv("Crop_recommendation.csv")
print(df.head())
print(df.shape)
print(df.columns)
print(df.info())
print(df.isnull().sum())
print("Duplicate Rows: ", df.duplicated().sum())
X = df.drop('label', axis=1)
y = df["label"]
print("Features: ")
print(X.head())
print("Target: ")
print(y.head())
print("X shape: ", X.shape)
print("y shape: ", y.shape)
from sklearn.model_selection import train_test_split
X_train,X_test,y_train,y_test = train_test_split(X,y,random_state=42,test_size=0.2)
print("X_train: ", X_train.shape)
print("X_test: ",X_test.shape)
print("y_train: ",y_train.shape)
print("y_test: ",y_test.shape)
from sklearn.neighbors import KNeighborsClassifier
model = KNeighborsClassifier(n_neighbors=5)
model.fit(X_train,y_train)
print("Model training completed")
y_pred = model.predict(X_test)
print("Actual values: ")
print(y_test.head(10))
print("Predicted values: ")
print(y_pred[:10])
from sklearn.metrics import accuracy_score,precision_score,recall_score,f1_score
accuracy = accuracy_score(y_test,y_pred)
precision = precision_score(y_test,y_pred, average="weighted")
recall = recall_score(y_test,y_pred, average="weighted")
f1 = f1_score(y_test,y_pred, average="weighted")
print("Accuracy: ",accuracy)
print("Precision: ",precision)
print("Recall: ",recall)
print("f1: ",f1)
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
import matplotlib.pyplot as plt

cm = confusion_matrix(y_test, y_pred)

disp = ConfusionMatrixDisplay(
    confusion_matrix=cm,
    display_labels=model.classes_
)

disp.plot(xticks_rotation=90, cmap="Greens")
plt.title("KNN - Crop Recommendation Confusion Matrix")
plt.show()
print("Confusion Matrix Completed")
print("Starting Hyperparameter Tuning...")
from sklearn.metrics import classification_report

report = classification_report(y_test, y_pred)

print("KNN Classification Report:")
print(report)
print("Starting Hyperparameter Tuning...")

from sklearn.model_selection import GridSearchCV
from sklearn.neighbors import KNeighborsClassifier

param_grid = {
    'n_neighbors': [3, 5, 7, 9, 11, 13, 15, 17, 19],
    'weights': ['uniform', 'distance'],
    'metric': ['euclidean', 'manhattan']
}

knn = KNeighborsClassifier()

grid = GridSearchCV(
    knn,
    param_grid,
    cv=5,
    scoring='accuracy',
    n_jobs=-1,
    verbose=2
)

grid.fit(X_train, y_train)

print("Tuning Completed!")
print("Best Parameters:", grid.best_params_)
print("Best CV Accuracy:", grid.best_score_)
best_knn = grid.best_estimator_

y_pred_tuned = best_knn.predict(X_test)

from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

accuracy = accuracy_score(y_test, y_pred_tuned)
precision = precision_score(y_test, y_pred_tuned, average="weighted")
recall = recall_score(y_test, y_pred_tuned, average="weighted")
f1 = f1_score(y_test, y_pred_tuned, average="weighted")

print("TUNED KNN RESULTS")
print("Accuracy:", accuracy)
print("Precision:", precision)
print("Recall:", recall)
print("F1 Score:", f1)
import joblib
joblib.dump(best_knn, "crop_knn_model.pkl")

print("Model saved successfully!")