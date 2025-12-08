import json
import os
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    AI-ассистент для консультаций по банкротству
    Args: event с httpMethod, body (message, history)
    Returns: ответ от OpenAI API
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
        import openai
        
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
        
        api_key = os.environ.get('OPENAI_API_KEY')
        if not api_key:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'OpenAI API key not configured'}),
                'isBase64Encoded': False
            }
        
        client = openai.OpenAI(api_key=api_key)
        
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

        messages = [{"role": "system", "content": system_prompt}]
        
        for msg in history[-5:]:
            messages.append({
                "role": msg.get("role", "user"),
                "content": msg.get("content", "")
            })
        
        messages.append({"role": "user", "content": user_message})
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=0.7,
            max_tokens=500
        )
        
        ai_message = response.choices[0].message.content
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'message': ai_message,
                'model': 'gpt-4o-mini'
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
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
