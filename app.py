from flask import Flask, request, jsonify, Response, send_from_directory,render_template
from flask_cors import CORS
import os
import time
from werkzeug.utils import secure_filename
import cv2
import cvzone
import math
from ultralytics import YOLO

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
UPLOAD_FOLDER = 'uploads'
PROCESSED_FOLDER = 'processed'
ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov', 'webm'}

# Create directories if they don't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['PROCESSED_FOLDER'] = PROCESSED_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50MB max upload size

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def process_video(input_path, detection_mode):
    """
    This function would process the video with the selected detection algorithm.
    For this implementation, we're just simulating processing time.
    """
    # In a real implementation, you would call your detection models here
    print(f"Processing video with {detection_mode} detection...")
    
    # Simulate processing time
    time.sleep(2)
    
    model = YOLO('yolov8s.pt')
    classnames = []
    with open('classes.txt', 'r') as f:
        classnames = f.read().splitlines()

    cap = cv2.VideoCapture(input_path)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)

    # Define output path and video writer
    output_filename = f"processed_{os.path.basename(input_path)}"
    output_path = os.path.join(app.config['PROCESSED_FOLDER'], output_filename)
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        results = model(frame)

        for info in results:
            parameters = info.boxes
            for box in parameters:
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                confidence = box.conf[0]
                class_detect = int(box.cls[0])
                class_label = classnames[class_detect]
                conf = math.ceil(confidence * 100)

                # Fall detection based on bounding box dimensions
                box_height = y2 - y1
                box_width = x2 - x1
                threshold = box_height - box_width

                if conf > 80 and class_label == 'person':
                    cvzone.cornerRect(frame, [x1, y1, box_width, box_height], l=30, rt=6)
                    cvzone.putTextRect(frame, f'{class_label}', [x1 + 8, y1 - 12], thickness=2, scale=2)

                    if threshold < 0:
                        cvzone.putTextRect(frame, 'Fall Detected', [x1, y2 + 30], thickness=2, scale=2)

        out.write(frame)  # Write annotated frame to output video

    cap.release()
    out.release()
    cv2.destroyAllWindows()

    
    return output_path

@app.route('/api/upload', methods=['POST'])
def upload_video():
    # Check if detection mode is provided
    detection_mode = request.form.get('mode')
    print(f"the detection mode is {detection_mode}")
    if not detection_mode:
        return jsonify({'success': False, 'error': 'Detection mode is required'}), 400
    
    # Check if the post request has the file part
    if 'video' not in request.files:
        return jsonify({'success': False, 'error': 'No video file provided'}), 400
    
    file = request.files['video']
    print(file)
    # If user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
        return jsonify({'success': False, 'error': 'No video selected'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        print(f"saving file to {file_path}")
        file.save(file_path)
        
        # Process the video
        try:
            processed_path = process_video(file_path, detection_mode)
            
            # In a real application, you might want to serve this file through a proper URL
            # For simplicity, we're returning the path
            return jsonify({
                'success': True, 
                'url': f"/api/video/{os.path.basename(processed_path)}"
            }), 200
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    
    return jsonify({'success': False, 'error': 'Invalid file format'}), 400

@app.route('/api/rtsp', methods=['POST'])
def connect_rtsp():
    data = request.json
    
    # Validate request data
    if not data:
        return jsonify({'success': False, 'error': 'No data provided'}), 400
    
    rtsp_url = data.get('url')
    detection_mode = data.get('mode')
    
    if not rtsp_url:
        return jsonify({'success': False, 'error': 'RTSP URL is required'}), 400
    
    if not detection_mode:
        return jsonify({'success': False, 'error': 'Detection mode is required'}), 400
    
    # In a real implementation, you would:
    # 1. Validate the RTSP URL
    # 2. Try to connect to the stream
    # 3. Start a worker thread/process to process the stream
    # 4. Return a unique identifier for the stream
    
    # For now, we'll simulate a successful connection
    try:
        # Simulate processing time
        time.sleep(2)
        
        # In a real application, you would return a URL to access the processed stream
        return jsonify({
            'success': True,
            'url': f"/api/stream/{hash(rtsp_url) % 10000}",  # Simplified unique ID
        }), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/api/video/<filename>')
def serve_video(filename):
    
    

    return send_from_directory(app.config['PROCESSED_FOLDER'], filename,as_attachment=False)

@app.route('/api/stream/<stream_id>')
def get_stream(stream_id):
    """
    This would return an endpoint to access the processed RTSP stream.
    For this implementation, we'll just return a success message.
    """
    # In a real application, you would:
    # 1. Check if the stream with the given ID is active
    # 2. Return the proper endpoint to access the stream (WebRTC, HLS, etc.)
    
    return jsonify({
        'success': True,
        'message': f'Stream {stream_id} is available',
        # In a real implementation, you would return the proper URL/endpoints here
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)