echo "" >| emptycron
crontab emptycron
rm emptycron

crontab -l > mastercron
echo "* * * * * /root/Projects/exact_token/scripts/shell/fetch.sh" > mastercron
echo "* * * * * sleep 10; /root/Projects/exact_token/scripts/shell/fetch.sh" >> mastercron
echo "* * * * * sleep 20; /root/Projects/exact_token/scripts/shell/fetch.sh" >> mastercron
echo "* * * * * sleep 30; /root/Projects/exact_token/scripts/shell/fetch.sh" >> mastercron
echo "* * * * * sleep 40; /root/Projects/exact_token/scripts/shell/fetch.sh" >> mastercron
echo "* * * * * sleep 50; /root/Projects/exact_token/scripts/shell/fetch.sh" >> mastercron

crontab mastercron
rm mastercron
