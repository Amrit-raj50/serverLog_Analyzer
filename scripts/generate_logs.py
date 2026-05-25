import random
import time
import json
import os

def generate_log_file(filename="test.log", num_lines=10000):
    ips = ["192.168.1.42", "10.0.0.7", "172.16.0.1", "8.8.8.8", "127.0.0.1"]
    methods = ["GET", "POST", "PUT", "DELETE"]
    paths = ["/api/users", "/api/login", "/api/data", "/home", "/about"]
    statuses = [200, 201, 400, 401, 404, 500]
    
    with open(filename, 'w') as f:
        for _ in range(num_lines):
            # 5-10% deviation chance
            if random.random() < 0.08:
                deviation_type = random.randint(1, 6)
                if deviation_type == 1:
                    # JSON line
                    line = json.dumps({
                        "timestamp": "2024-03-15T14:23:01Z",
                        "ip": random.choice(ips),
                        "method": random.choice(methods),
                        "path": random.choice(paths),
                        "status": random.choice(statuses),
                        "time": f"{random.randint(10, 500)}ms"
                    })
                elif deviation_type == 2:
                    # Malformed line
                    line = "Exception in thread \"main\" java.lang.NullPointerException\n\tat com.example.App.main(App.java:10)"
                elif deviation_type == 3:
                    # Missing status code
                    line = f"2024-03-15T14:23:01Z {random.choice(ips)} {random.choice(methods)} {random.choice(paths)} - {random.randint(10, 500)}ms"
                elif deviation_type == 4:
                    # Different timestamp (Unix epoch)
                    line = f"{int(time.time())} {random.choice(ips)} {random.choice(methods)} {random.choice(paths)} {random.choice(statuses)} {random.randint(10, 500)}ms"
                elif deviation_type == 5:
                    # Time in seconds
                    line = f"2024/03/15 14:23:01 {random.choice(ips)} {random.choice(methods)} {random.choice(paths)} {random.choice(statuses)} {random.uniform(0.01, 0.5):.3f}s"
                else:
                    # Extra fields (user agent)
                    line = f"15-Mar-2024 14:23:01 {random.choice(ips)} {random.choice(methods)} {random.choice(paths)} {random.choice(statuses)} {random.randint(10, 500)}ms \"Mozilla/5.0 (Windows NT 10.0; Win64; x64)\""
            else:
                # Normal line
                line = f"2024-03-15T14:23:01Z {random.choice(ips)} {random.choice(methods)} {random.choice(paths)} {random.choice(statuses)} {random.randint(10, 500)}ms"
            
            f.write(line + "\n")

if __name__ == "__main__":
    os.makedirs(os.path.dirname(os.path.abspath(__file__)), exist_ok=True)
    generate_log_file()
    print("test.log generated successfully in scripts/ folder!")
