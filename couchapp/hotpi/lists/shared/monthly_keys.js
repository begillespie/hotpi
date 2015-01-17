        temps.header_date        = moment(rows[0].key).format('MMM YYYY');
        temps.prev_link_start    = moment(rows[0].key).startOf('month').subtract('month', 1).format('YYYY-MM-DD[T00:00]');
        temps.prev_link_end      = moment(rows[0].key).endOf('month').subtract('month', 1).format('YYYY-MM-DD[T00:00]');
        temps.current_link_start = moment(rows[0].key).startOf('month').format('YYYY-MM-DD[T00:00]');
        temps.current_link_end   = moment(rows[0].key).endOf('month').format('YYYY-MM-DD[T00:00]');
        temps.next_link_start    = moment(rows[0].key).startOf('month').add('month', 1).format('YYYY-MM-DD[T00:00]');
        temps.next_link_end      = moment(rows[0].key).endOf('month').add('month', 1).format('YYYY-MM-DD[T00:00]');
