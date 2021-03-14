#include <iostream>
#include <fstream>
#include <vector>
#include <stack>
#include <string>
#include <ctype.h>

using namespace std;

string pangrams(string s) {
    const int alphabet = 26;
    int found[alphabet] = { 0 };
    for (int i = 0; i < s.length(); i++ )
    {
        char currentChar = tolower(s[i]);
        if (currentChar != ' ')
        {
            found[currentChar - 'a'] = 1;
        }
    }
    for (int i = 0; i < alphabet; i++)
    {
        if ( found[i] == 0 )
        {
            return "not pangram";
        }
    }
    return "pangram";
}

int main()
{
    //ofstream fout(getenv("OUTPUT_PATH"));
    ifstream idatafile("input.txt");
    if (idatafile.is_open())
    {
        string s;
        int q;
        getline(idatafile, s);

        string result = pangrams(s);

        std::cout << result << "\n";
        
        idatafile.close();
    }
    //fout.close();
    return 0;
}
