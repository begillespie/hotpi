        temps.header_date        = moment(rows[0].key).format('MMM YYYY');
        temps.prev_link_start    = moment(rows[0].key).startOf('month').subtract('month', 1).toArray();
        temps.prev_link_end      = moment(rows[0].key).endOf('month').subtract('month', 1).toArray();
        temps.current_link_start = moment(rows[0].key).startOf('month').toArray();
        temps.current_link_end   = moment(rows[0].key).endOf('month').toArray();
        temps.next_link_start    = moment(rows[0].key).startOf('month').add('month', 1).toArray();
        temps.next_link_end      = moment(rows[0].key).endOf('month').add('month', 1).toArray();
