import yfinance as yf
from datetime import datetime, timedelta

# NOTE: look_back is defined in actual days but stocks are only
# recorded on Monday through Friday, so a look_back of 100
# corresponds to an actual amount of days near 68
def get_stock_price(ticker_symbol, look_back=100):
    end_date = datetime.now()
    start_date = end_date - timedelta(days=look_back)
    data = yf.download(ticker_symbol, start=start_date, end=end_date)

    return list(data['Close'])