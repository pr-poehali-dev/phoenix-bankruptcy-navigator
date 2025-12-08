import json
import os
import requests
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    AI-ассистент для консультаций по банкротству через YandexGPT
    Args: event с httpMethod, body (message, history)
    Returns: ответ от YandexGPT API
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        user_message: str = body_data.get('message', '')
        history: List[Dict[str, str]] = body_data.get('history', [])
        
        if not user_message:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Message is required'}),
                'isBase64Encoded': False
            }
        
        api_key = os.environ.get('YANDEX_API_KEY')
        folder_id = os.environ.get('YANDEX_FOLDER_ID')
        
        if not api_key or not folder_id:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'YandexGPT credentials not configured'}),
                'isBase64Encoded': False
            }
        
        system_prompt = """Ты — профессиональный AI-ассистент платформы "Феникс: Навигатор банкротства". 
Твоя задача — консультировать пользователей по вопросам банкротства физических лиц в России.

Ключевые принципы:
- Используй простой, понятный язык без излишней юридической терминологии
- Будь эмпатичным — люди обращаются в сложной жизненной ситуации
- Давай конкретные, практичные советы
- При необходимости рекомендуй воспользоваться калькулятором или специалистами платформы
- Всегда упоминай, что это общая информация, а точные рекомендации даст юрист

Основная информация:
- Банкротство возможно при долгах от 500 тыс. руб. и просрочке 3+ месяца
- Стоимость процедуры: от 55 000 руб. (госпошлина, ФУ, юрист)
- Длительность: 6-12 месяцев в среднем
- Сохраняется: единственное жильё, личные вещи, профессиональный инструмент
- Списываются: кредиты, займы МФО, долги по картам, долги физлицам
- НЕ списываются: алименты, вред жизни/здоровью, зарплаты, текущие платежи

Отвечай кратко (2-4 предложения), структурированно, дружелюбно."""

        messages = [{"role": "system", "text": system_prompt}]
        
        for msg in history[-5:]:
            role = msg.get("role", "user")
            if role == "assistant":
                role = "assistant"
            messages.append({
                "role": role,
                "text": msg.get("content", "")
            })
        
        messages.append({"role": "user", "text": user_message})
        
        url = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Api-Key {api_key}",
            "x-folder-id": folder_id
        }
        
        payload = {
            "modelUri": f"gpt://{folder_id}/yandexgpt-lite",
            "completionOptions": {
                "stream": False,
                "temperature": 0.6,
                "maxTokens": 500
            },
            "messages": messages
        }
        
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        
        if not response.ok:
            error_text = response.text
            return {
                'statusCode': response.status_code,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f'YandexGPT API error: {error_text}'}),
                'isBase64Encoded': False
            }
        
        result = response.json()
        ai_message = result.get("result", {}).get("alternatives", [{}])[0].get("message", {}).get("text", "")
        
        if not ai_message:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Empty response from YandexGPT'}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'message': ai_message,
                'model': 'yandexgpt-lite'
            }, ensure_ascii=False),
            'isBase64Encoded': False
        }
        
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid JSON'}),
            'isBase64Encoded': False
        }
    except requests.exceptions.Timeout:
        return {
            'statusCode': 504,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Request timeout'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
