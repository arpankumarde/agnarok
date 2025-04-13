# agent_template.py
from agno.agent import Agent
from agno.models.ollama import Ollama
import os
import sys
import logging
from flask import Flask, request, jsonify
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("{agent_id}")

# Load .env from the main project directory if needed (adjust path if necessary)
# This assumes the agent script is run from the project root or .env is accessible
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dotenv_path = os.path.join(project_root, ".env")
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path=dotenv_path)
    logger.info(f"Loaded .env from {dotenv_path}")
else:
    # Fallback if running directly from agents/ dir and .env is in root
    load_dotenv()
    logger.info("Loaded .env from current directory")

logger.info(f"GROQ_API_KEY present: {bool(os.getenv('GROQ_API_KEY'))}")

# --- Dynamic Imports ---
{imports}
# --- End Dynamic Imports ---

# --- Dynamic Tools ---
agent_tools = [{tools}]
# --- End Dynamic Tools ---

# --- Dynamic Instructions ---
agent_instructions = [
    f"""
You are agent '{agent_id}'. {instructions}
If the prompt is a question, answer it directly in English.
If the prompt is a request for information, provide the requested information.
    """
]
# --- End Dynamic Instructions ---

logger.info("Creating agent...")
try:
    agent = Agent(
        model=Ollama(
            host="http://82.112.237.171:11434",
            id="qwen2.5:3b",
        ),
        # model=Groq(
        #     id="llama-3.1-8b-instant",  # Or make this configurable per agent later
        #     api_key=os.getenv("GROQ_API_KEY"),
        # ),
        tools=agent_tools,
        show_tool_calls=True,
        instructions=agent_instructions,
        add_datetime_to_instructions=True,
    )
    logger.info("Agent created successfully")
except Exception as e:
    logger.error(f"Failed to create agent: {str(e)}")
    print(f"FATAL ERROR: Could not create agent: {str(e)}", file=sys.stderr)
    sys.exit(1)

app = Flask(__name__)


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    if not data or "prompt" not in data:
        return jsonify({"error": "Missing 'prompt' in request body"}), 400

    prompt = data["prompt"]
    try:
        response = agent.run(prompt).content
        return jsonify({"response": response})
    except Exception as e:
        logger.error(f"Error during agent run: {str(e)}")
        print(f"Error during agent run: {e}", file=sys.stderr)  # Log error
        return jsonify({"error": "Agent failed to process the request"}), 500


@app.route("/health", methods=["GET"])
def health_check():
    # Simple health check endpoint
    return jsonify({"status": "running", "agent_id": "{agent_id}"}), 200


if __name__ == "__main__":
    # Port is passed via environment variable set by the main app
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 3001
    print(f"Starting agent '{agent_id}' on port {port}...")
    logger.info(f"Starting Flask server on port {port}")

    try:
        # Use host='0.0.0.0' to make it accessible externally if needed
        app.run(host="0.0.0.0", port=port)  # Removed debug=True for agent processes
    except Exception as e:
        logger.critical(f"Failed to start Flask server: {str(e)}")
        print(
            f"CRITICAL ERROR! Failed to start Flask server: {str(e)}", file=sys.stderr
        )
        sys.exit(1)
